import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeHighlightProps {
  code: string;
  language: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlight;
