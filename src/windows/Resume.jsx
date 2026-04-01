import { useState, useEffect } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper"
import { Download } from "lucide-react";
import { pdfjs ,Page,Document} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const MD_BREAKPOINT = 768;

const Resume = () => {
  const [pdfWidth, setPdfWidth] = useState(undefined);

  useEffect(() => {
    const update = () => {
      setPdfWidth(window.innerWidth < MD_BREAKPOINT ? window.innerWidth - 32 : undefined);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
    <div id="window-header">
        <WindowControls target="resume"/>
        <h2>Resume.pdf</h2>
        <a href="/public/files/resume.pdf" download="resume.pdf" className="cursor-pointer"
         title="Download resume">
            <Download className="icon"/>
         </a>
    </div>
    
     <Document file="/public/files/resume.pdf">
        <Page pageNumber={1}
         width={pdfWidth}
         renderTextLayer 
         renderAnnotationLayer/>
      </Document>
    </>
  )
}
const ResumeWindow=WindowWrapper(Resume,"resume");


export default ResumeWindow;
