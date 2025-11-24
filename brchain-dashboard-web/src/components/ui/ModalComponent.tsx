"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

interface ApprovalModalProps {
  isOpen: boolean;
  onButtonClick?: () => void;
  title?: ReactNode | string;
  message?: string;
  buttonText?: string;
  options?: Array<string>;
  type?: "success" | "failed";
}

const buttonBg = "bg-[#0D3F33]";
const ARROW_DOWN_PATH = "/icons/arrow-down-black.svg";
const SUCCESS_ICON = "/icons/success-icon.svg";
const FAILED_ICON = "/icons/failed-icon.svg";

const ModalComponent = ({
  isOpen,
  onButtonClick,
  title,
  message,
  buttonText,
  options,
  type,
}: ApprovalModalProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSeleted] = useState("Selecione");

  if (!isOpen) return null;

  const iconType = {
    success: SUCCESS_ICON,
    failed: FAILED_ICON,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60
 p-4 text-center"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex justify-center mb-2">
          {type && (
            <Image
              src={iconType[type]}
              alt="icone do componente de modal"
              width={100}
              height={100}
            />
          )}
        </div>
        <h2 className="mb-4 text-xl font-bold text-black">{title}</h2>

        <div className="flex w-full justify-center select-none">
          {options && (
            <div className="relative min-h-[34px] w-[300px]">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
                className={`flex cursor-pointer items-center justify-between border-2 border-black/40 bg-white py-2 pr-3 `}
                style={
                  isDropdownOpen
                    ? { borderRadius: "12px 12px 0 0" }
                    : { borderRadius: "12px" }
                }
              >
                <span className="pl-3 text-md font-bold text-black/40">
                  {selected}
                </span>

                <Image
                  src={ARROW_DOWN_PATH}
                  alt="Abrir opções"
                  width={12}
                  height={12}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {isDropdownOpen && (
                <div
                  className="absolute left-0 right-0 z-10 overflow-hidden border-2 border-t-0 border-black/40 bg-white shadow-xl"
                  style={{ borderRadius: "0 0 16px 16px" }}
                >
                  {options.map((option) => (
                    <div
                      key={option}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSeleted(option);
                        setIsDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSeleted(option);
                          setIsDropdownOpen(false);
                        }
                      }}
                      className="cursor-pointer px-3 py-2 text-left text-xs text-black transition-colors hover:bg-gray-100"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-base font-bold text-black">{message}</p>

        <div className="flex w-full justify-center">
          <button
            onClick={onButtonClick}
            className={`min-h-[34px] w-[300px] ${buttonBg} text-base mt-5 flex 
                     cursor-pointer items-center justify-center rounded-lg p-2 font-bold text-white transition duration-150 hover:bg-opacity-90`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
