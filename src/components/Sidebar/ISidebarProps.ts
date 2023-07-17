export default interface ISidebarProps {
  isOpen: boolean;
  close: () => void;
  onChangeFixed: (fixed: boolean) => void;
  onChangeSize: (px: number) => void;
}
