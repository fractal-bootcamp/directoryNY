import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function DescriptionBoxPopup({
  onClose,
  description,
}: {
  onClose: (value: boolean) => void;
  description: string;
}) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-white bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 h-screen">
          <DialogPanel
            transition
            className="h-4/6 relative transform overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-8 border border-gray-200"
          >
            <div className="font-light">
              <div className="font-bold">About</div>
              <div>{description}</div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
