import { PanelResizeHandle } from "react-resizable-panels";



export default function ResizeHandle({
  className = "",
  id
}: {
  className?: string;
  id?: string;
}) {
  const resizeHandleOuter = "flex-none w-full h-1 relative outline-none hover:bg-slate-400";

  return (
    <PanelResizeHandle
      className={[resizeHandleOuter, className].join(" ")}
      id={id}
    >
    </PanelResizeHandle>
  );
}
