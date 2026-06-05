"use client";

import { useRef, useState } from 'react';
import styles from './styles.module.css';

const GRID_SIZE = 10;

type Point = {
  x: number;
  y: number;
};

type SelectionBox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type SelectionInfo = {
  count: number;
  rows: number;
  cols: number;
  rowStart: number;
  colStart: number;
};

export default function App() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set());

  const getPoint = (event: React.MouseEvent): Point => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const getSelectionBox = (start: Point, end: Point): SelectionBox => {
    return {
      left: Math.min(start.x, end.x),
      top: Math.min(start.y, end.y),
      right: Math.max(start.x, end.x),
      bottom: Math.max(start.y, end.y),
    };
  };

  const getSelectedCells = (box: SelectionBox): Set<number> => {
    const nextSelected = new Set<number>();

    if (!gridRef.current) return nextSelected;

    const cells = gridRef.current.querySelectorAll('[data-cell-index]');

    cells.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      const index = Number((cell as HTMLElement).dataset.cellIndex);

      const overlaps =
        rect.left < box.right &&
        rect.right > box.left &&
        rect.top < box.bottom &&
        rect.bottom > box.top;

      if (overlaps) {
        nextSelected.add(index);
      }
    });

    return nextSelected;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    const point = getPoint(event);

    setIsDragging(true);
    setStartPoint(point);
    setCurrentPoint(point);
    setSelectedCells(new Set());
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !startPoint) {
      return;
    }

    const point = getPoint(event);
    const box = getSelectionBox(startPoint, point);

    setCurrentPoint(point);
    setSelectedCells(getSelectedCells(box));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartPoint(null);
    setCurrentPoint(null);
  };

  const handlePageClick = () => {
    if (!isDragging) {
      setSelectedCells(new Set());
    }
  };

  const getSelectionInfo = (cells: Set<number>): SelectionInfo | null => {
    if (cells.size === 0) return null;

    const indices = Array.from(cells);
    const rowIndices = indices.map((i) => Math.floor(i / GRID_SIZE));
    const colIndices = indices.map((i) => i % GRID_SIZE);

    const minRow = Math.min(...rowIndices);
    const maxRow = Math.max(...rowIndices);
    const minCol = Math.min(...colIndices);
    const maxCol = Math.max(...colIndices);

    return {
      count: cells.size,
      rows: maxRow - minRow + 1,
      cols: maxCol - minCol + 1,
      rowStart: minRow + 1,
      colStart: minCol + 1,
    };
  };

  const selectionBox =
    isDragging && startPoint && currentPoint
      ? getSelectionBox(startPoint, currentPoint)
      : null;

  const selectionInfo = getSelectionInfo(selectedCells);

  return (
    <div
      className={styles.page}
      onClick={handlePageClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={gridRef}
        className={styles.grid}
        onMouseDown={handleMouseDown}
        onClick={(event) => event.stopPropagation()}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => (
          <div
            key={index}
            data-cell-index={index}
            className={`${styles.cell} ${
              selectedCells.has(index) ? styles.selected : ''
            }`}
          />
        ))}
      </div>

      {selectionInfo && (
        <div className={styles.dashboard}>
          <p className={styles.dashboardTitle}>Selection</p>
          <dl className={styles.statList}>
            <div className={styles.stat}>
              <dt>Cells</dt>
              <dd>{selectionInfo.count}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Dimensions</dt>
              <dd>{selectionInfo.cols} × {selectionInfo.rows}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Start</dt>
              <dd>Row {selectionInfo.rowStart}, Col {selectionInfo.colStart}</dd>
            </div>
          </dl>
        </div>
      )}

      {selectionBox && (
        <div
          className={styles.selectionBox}
          style={{
            left: selectionBox.left,
            top: selectionBox.top,
            width: selectionBox.right - selectionBox.left,
            height: selectionBox.bottom - selectionBox.top,
          }}
        />
      )}
    </div>
  );
}