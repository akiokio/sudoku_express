import { Request, Response } from "express";
import faker from "faker";
import { cloneDeep } from "lodash";

import asyncMiddleware from "../middlewares/async";
import models, { dbType } from "../models";
import Game from "../models/game";

const home = asyncMiddleware(async (req: Request, res: Response) => {
  const games = await (models as dbType).Game.findAll();
  res.json({
    success: true,
    games: games.map((game: Game) => ({
      id: game.id,
      name: game.name,
      url: game.getPlayUrl(req)
    }))
  });
});

const start = asyncMiddleware(async (req: Request, res: Response) => {
  const game = await (models as dbType).Game.build({
    name: req.query.name || faker.lorem.words(2)
  });

  game.initBoard();
  try {
    await game.save();
  } catch (error) {
    throw error;
  }

  res.json({
    success: true,
    url: game.getPlayUrl(req),
    game
  });
});

const play = asyncMiddleware(async (req: Request, res: Response) => {
  const [game] = await (models as dbType).Game.findAll({
    where: {
      id: req.params.id
    }
  });
  if (!game) {
    res.status(404).json({ success: false, error: "Game not found" });
  }
  res.json({
    success: true,
    game: {
      url: game.getPlayUrl(req),
      name: game.name,
      board: game.board
    }
  });
});

const updateBoard = asyncMiddleware(async (req: Request, res: Response) => {
  const row = parseInt(req.body["row"]);
  const col = parseInt(req.body["col"]);
  const val = parseInt(req.body["val"]);

  const [game] = await (models as dbType).Game.findAll({
    where: {
      id: req.params.id
    }
  });

  if (!game) {
    return res.status(404).json({
      success: false,
      error: "Game not found"
    });
  }

  if (!("row" in req.body) || !("col" in req.body) || !("val" in req.body)) {
    return res.status(400).json({
      success: false,
      error: "Row, col or val empty",
      game
    });
  }

  if (!game.isRowValid(row)) {
    return res
      .status(400)
      .json({ success: false, error: "Row is not valid", game });
  }

  if (!game.isColValid(col)) {
    return res
      .status(400)
      .json({ success: false, error: "Col is not valid", game });
  }

  if (!game.isValueValid(val)) {
    return res
      .status(400)
      .json({ success: false, error: "Value is not valid", game });
  }

  if (!game.isEmptySpace(row, col)) {
    return res
      .status(400)
      .json({ success: false, error: "Space not empty", game });
  }

  if (!game.isValueApplicable(row, col, val)) {
    return res.status(400).json({
      success: false,
      error: "This value cannot be applied here",
      game
    });
  }

  await (models as dbType).sequelize.query(
    `UPDATE "Games" SET board[${row + 1}][${col + 1}] = ${val} WHERE id = '${
      req.params.id
    }';`
  );
  await game.reload();

  if (game.isBoardComplete()) {
    return res.status(200).json({
      success: true,
      boardCompleted: true,
      game,
      message: "Congratulations you have finished this puzze!"
    });
  }

  return res.json({
    success: true,
    game,
    message: "Still work to do, keep going!"
  });
});

const deleteGame = asyncMiddleware(async (req: Request, res: Response) => {
  await (models as dbType).Game.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json({ success: true, message: "Game deleted" });
});

const solveGame = asyncMiddleware(async (req: Request, res: Response) => {
  const [game] = await (models as dbType).Game.findAll({
    where: {
      id: req.params.id
    }
  });
  if (!game) {
    res.status(404).json({ success: false, error: "Game not found" });
  }

  const result = game.solveBoard(0, 0);
  game.board = cloneDeep(game.board);
  await game.save();

  return res.json({
    success: result,
    game,
    message: result
      ? "Board solved successfully!"
      : "This board is impossible to solve!"
  });
});

export { home, start, play, updateBoard, deleteGame, solveGame };
