import { extendTheme } from '@chakra-ui/react';

// HACK: TypeScript doesn't working, so using HACK
// ref: https://github.com/chakra-ui/chakra-ui/issues/4573

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

theme as typeof extendTheme;

export default theme;
