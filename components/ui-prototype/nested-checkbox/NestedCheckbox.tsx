"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NestedCheckbox.module.css";

type CheckboxState = boolean | "indeterminate";

interface CheckboxItem {
  id: number;
  name: string;
  checked?: CheckboxState;
  children?: CheckboxItem[];
}

const fileData: CheckboxItem[] = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Mobile phones",
        children: [
          { id: 3, name: "iPhone" },
          { id: 4, name: "Android" },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        children: [
          { id: 6, name: "MacBook" },
          { id: 7, name: "Surface Pro" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    children: [
      { id: 9, name: "Fiction" },
      { id: 10, name: "Non-fiction" },
    ],
  },
  { id: 11, name: "Toys" },
];

/**
 * Interview Discussion:
 *
 * We have two requirements:
 *
 * 1. Downward propagation
 *    If a parent is checked/unchecked,
 *    all descendants should inherit that value.
 *
 * 2. Upward propagation
 *    When a child changes,
 *    all ancestors must recalculate their state:
 *
 *      all checked      => checked
 *      none checked     => unchecked
 *      partial checked  => indeterminate
 *
 * A recursive tree traversal is the cleanest solution.
 */

/**
 * Recursively updates the current node and ALL descendants.
 *
 * Example:
 *
 * Electronics (checked)
 *   Mobile Phones
 *      iPhone
 *      Android
 *
 * Checking Electronics should check every node below it.
 *
 * Time Complexity: O(size of subtree)
 */
function setDescendantsChecked(
  item: CheckboxItem,
  checked: boolean
): CheckboxItem {
  return {
    ...item,
    checked,
    children: item.children?.map((child) =>
      setDescendantsChecked(child, checked)
    ),
  };
}

/**
 * Determines parent's state from DIRECT children.
 *
 * Rules:
 *
 * [true, true] => true
 * [false, false] => false
 * [true, false] => indeterminate
 * [true, indeterminate] => indeterminate
 */
function getParentState(children: CheckboxItem[]): CheckboxState {
  const states = children.map((child) => child.checked ?? false);

  const allChecked = states.every((state) => state === true);
  const allUnchecked = states.every((state) => state === false);

  if (allChecked) return true;
  if (allUnchecked) return false;

  return "indeterminate";
}

/**
 * Main recursive update function.
 *
 * Traverses tree looking for target node.
 *
 * Once found:
 *  - update target
 *  - update all descendants
 *
 * While recursion unwinds:
 *  - recompute every ancestor state
 *
 * Example:
 *
 * User checks:
 *   iPhone
 *
 * Recursion bubbles upward:
 *
 * iPhone => checked
 * Mobile Phones => indeterminate
 * Electronics => indeterminate
 *
 * Time Complexity: O(N)
 * N = total nodes in tree
 */
function updateTree(
  items: CheckboxItem[],
  targetId: number,
  checked: boolean
): CheckboxItem[] {
  return items.map((item) => {
    /**
     * Found clicked node.
     *
     * Apply value to entire subtree.
     */
    if (item.id === targetId) {
      return setDescendantsChecked(item, checked);
    }

    /**
     * Leaf node.
     *
     * Nothing to search below.
     */
    if (!item.children) {
      return item;
    }

    /**
     * Continue DFS search.
     */
    const updatedChildren = updateTree(
      item.children,
      targetId,
      checked
    );

    /**
     * After child updates complete,
     * recompute current parent state.
     */
    return {
      ...item,
      children: updatedChildren,
      checked: getParentState(updatedChildren),
    };
  });
}

interface CheckboxNodeProps {
  item: CheckboxItem;
  onChange: (id: number, checked: boolean) => void;
}

/**
 * Recursive component.
 *
 * Every node renders itself,
 * then recursively renders children.
 *
 * Interview Tip:
 * Nested data structures are almost always
 * a good use case for recursive components.
 */
function CheckboxNode({
  item,
  onChange,
}: CheckboxNodeProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const checked = item.checked === true;
  const isIndeterminate =
    item.checked === "indeterminate";

  /**
   * Important Interview Point:
   *
   * HTML does NOT support:
   *
   * <input indeterminate />
   *
   * indeterminate is a DOM property,
   * so we must set it imperatively.
   */
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <li className={styles.item}>
      <label className={styles.label}>
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          onChange={(event) =>
            onChange(item.id, event.target.checked)
          }
        />

        <span>{item.name}</span>
      </label>

      {item.children && (
        <ul className={styles.list}>
          {item.children.map((child) => (
            <CheckboxNode
              key={child.id}
              item={child}
              onChange={onChange}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NestedCheckbox() {
  /**
   * Store entire tree in state.
   *
   * Alternative:
   * normalize tree into a Map for
   * O(1) node lookup on huge trees.
   *
   * For interview scale,
   * recursive tree structure is simpler.
   */
  const [items, setItems] =
    useState<CheckboxItem[]>(fileData);

  const handleChange = (
    id: number,
    checked: boolean
  ) => {
    setItems((currentItems) =>
      updateTree(currentItems, id, checked)
    );
  };

  return (
    <div className={styles.container}>
      <h2>Nested Checkbox</h2>

      <ul className={styles.list}>
        {items.map((item) => (
          <CheckboxNode
            key={item.id}
            item={item}
            onChange={handleChange}
          />
        ))}
      </ul>
    </div>
  );
}