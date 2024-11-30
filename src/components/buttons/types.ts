export type ButtonTypes = {
  label: string;
  onClick?: () => void;
  isLink?: boolean;
  link?: string;
  type?: "button" | "submit" | "reset";
  modifier?: string;
  icon?: string;
};
