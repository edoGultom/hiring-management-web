import clsx from "clsx";
import * as React from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen = true, onClose, children, ...props }, ref) => {
    // 🔒 Handle scroll lock
    React.useEffect(() => {
      if (isOpen) {
        // Simpan posisi scroll agar tidak "meloncat"
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        // Kembalikan posisi scroll sebelumnya
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }

      return () => {
        // Bersihkan saat unmount
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Modal content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={clsx(
              "relative bg-white rounded-lg shadow-lg flex flex-col max-h-[90vh]",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
);
Modal.displayName = "Modal";

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex items-center gap-2 p-6 border-b", className)}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={clsx("flex-1 text-text-xl font-bold", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex-1 overflow-auto", className)}
    {...props}
  />
));
ModalContent.displayName = "ModalContent";

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "flex items-center justify-end gap-2 p-6 border-t",
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter };
