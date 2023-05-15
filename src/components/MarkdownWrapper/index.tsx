import React from 'react';
import {Linking} from 'react-native';
import Markdown from 'react-native-markdown-package';
import {markdownStyles} from './styles';

type Props = {
  styles?: any;
  onLink?: () => void;
  text?: string;
};

const MarkdownWrapper = ({text, ...props}: Props) => {
  return (
    <Markdown styles={markdownStyles} onLink={Linking.openURL} {...props}>
      {text}
    </Markdown>
  );
};

export default MarkdownWrapper;
