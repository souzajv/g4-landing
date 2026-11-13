import test from "node:test";
import assert from "node:assert/strict";
import {
  chapterAt,
  videoTimeAt,
  clampProgress,
} from "../src/lib/heroScroll.js";

test("scroll inválido ou fora da faixa não gera capítulos inexistentes", () => {
  assert.equal(chapterAt(-1), 0);
  assert.equal(chapterAt(1), 2);
  assert.equal(chapterAt(3), 2);
  assert.equal(clampProgress(NaN), 0);
});
test("os três capítulos seguem o progresso e podem retroceder", () => {
  assert.deepEqual([0, 0.4, 0.8, 0.4, 0].map(chapterAt), [0, 1, 2, 1, 0]);
});
test("seek aguarda duração válida e não ultrapassa o fim do vídeo", () => {
  for (const duration of [NaN, Infinity, 0, -1])
    assert.equal(videoTimeAt(0.5, duration), 0);
  assert.equal(videoTimeAt(0, 12), 0);
  assert.equal(videoTimeAt(1, 12), 11.94);
  assert.equal(videoTimeAt(2, 12), 11.94);
  assert.equal(videoTimeAt(0.5, 12), 5.97);
});
