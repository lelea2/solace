"use client";

import { ComponentProps, useId } from 'react';
import { createPortal } from 'react-dom';
import styles from "./styles.module.css";

export default function ModalDialog({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

function ModalDialogImpl({
  children,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}>) {
  const titleId = useId();
  const contentId = useId();

  return createPortal(
    <div className={styles.modalOverlay}>
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className={styles.modal}
        role="dialog">
        <h1 className={styles.modalTitle} id={titleId}>
          {title}
        </h1>
        <div id={contentId}>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
