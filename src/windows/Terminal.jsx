import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, ChevronRight } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = () => {
  const totalItems = techStack.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="terminal-header">
        <WindowControls target="terminal" />
        <h2>pradip — zsh — 80×24</h2>
        <div />
      </div>

      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">pradip@MacBook</span>
          <span className="terminal-path">~/portfolio</span>
          <span className="terminal-dollar">$</span>
          <span className="terminal-cmd">show --tech-stack</span>
        </div>

        <div className="terminal-output">
          <div className="terminal-table-header">
            <span className="terminal-col-category">CATEGORY</span>
            <span className="terminal-col-tech">TECHNOLOGIES</span>
          </div>

          <div className="terminal-divider" />

          {techStack.map(({ category, items }) => (
            <div key={category} className="terminal-row">
              <span className="terminal-category">
                <ChevronRight size={14} className="inline text-green-400" />
                {category}
              </span>
              <span className="terminal-items">
                {items.map((item, i) => (
                  <span key={i} className="terminal-tag">{item}</span>
                ))}
              </span>
            </div>
          ))}

          <div className="terminal-divider" />

          <div className="terminal-footer">
            <p>
              <Check size={14} className="inline text-green-400" />{" "}
              {techStack.length} categories loaded — {totalItems} technologies found
            </p>
            <p className="terminal-time">✦ exec time: 0.042s</p>
          </div>
        </div>

        <div className="terminal-line mt-4">
          <span className="terminal-prompt">pradip@MacBook</span>
          <span className="terminal-path">~/portfolio</span>
          <span className="terminal-dollar">$</span>
          <span className="terminal-cursor">▊</span>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
