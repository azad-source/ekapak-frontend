import { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { PhoneIcon } from "../icons/phone-icon";
import styles from "./phones-contacts.module.css";
import clsx from "clsx";

export const PhonesContacts = ({
  phones,
  isMobile = false,
}: {
  phones: string[];
  isMobile?: boolean;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setOpen(false);
    };

    const handleClickBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) {
        setOpen(false);
      }
    };

    dialog.addEventListener("close", handleClose);

    dialog.addEventListener("click", handleClickBackdrop);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleClickBackdrop);
    };
  }, []);

  const handleCloseClick = () => {
    setTimeout(() => {
      dialogRef.current?.close();
    }, 200);
  };

  if (!isMobile) {
    return (
      <div className="flex gap-5 title-tiny">
        {phones.map((ph) => (
          <a key={ph} href={`tel:${ph}`} className="hover:underline">
            {formatPhoneNumber(ph)}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} className="header-mobile-btn">
        <PhoneIcon />
      </button>

      <dialog
        ref={dialogRef}
        className={clsx(styles.dialogBase, open && styles.dialogOpen)}
      >
        <div className="relative flex flex-col gap-4">
          {/* Close button */}
          <button
            type="button"
            onClick={handleCloseClick}
            className="
              absolute right-0 top-0
              rounded-full p-2
              text-gray-500
              hover:bg-gray-100
              focus:outline-none
              text-[20px]
            "
            aria-label="Закрыть"
          >
            ✕
          </button>

          <h2 className="text-lg font-semibold">Выберите телефон</h2>

          <div className="flex flex-col items-start gap-5 text-small">
            {phones.map((ph) => (
              <a key={ph} href={`tel:${ph}`} className="hover:underline">
                {formatPhoneNumber(ph)}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};
