# フォームヘルパー

## どれを使う

フォームヘルパー に使うのは React Hook Form が安パイ。非制御コンポーネントにする必要があるなど、若干の癖がある点には注意。

また、 React Hook Form には外部ライブラリのバリデーションメソッドを用いるカスタムリゾルバという仕組みがある。Yup , Zod の採用例が多い。 Yup がおすすめ。

## React Hook Form

参考 : [API Documentation | React Hook Form - Simple React forms validation](https://react-hook-form.com/api/)

### サンプルコード

```tsx
import type { FC, SyntheticEvent } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { genderCode } from 'schemas';

interface FormData {
  username: string;
  zipcode?: string;
  gender?: keyof typeof genderCode;
  isAgreed: boolean;
}

const RegistrationForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      username: '',
      isAgreed: false,
    },
  });
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
  };

  return (
    <Box p={3} w="md" borderWidth="1px" borderRadius="lg" boxShadow="base">
      <form onSubmit={handleSubmit(onSubmit)} action="/hoge">
        <FormLabel htmlFor="username" mt={2}>
          ユーザー名
        </FormLabel>
        <Input size="md" {...register('username')} />
        <FormLabel htmlFor="zipcode" mt={4}>
          郵便番号
        </FormLabel>
        <Input size="md" maxLength={7} {...register('zipcode')} />
        <Select my={6} placeholder="性別を選択…" {...register('gender')}>
          {Object.entries(genderCode).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </Select>
        <Checkbox {...register('isAgreed')}>規約に同意する</Checkbox>
        <ButtonGroup my={3} w="xs">
          <Button
            w="30%"
            colorScheme="orange"
            variant="solid"
            onClick={onReset}
          >
            リセット
          </Button>
          <Button w="70%" colorScheme="blue" variant="solid" type="submit">
            送信
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default RegistrationForm;
```

核となるのは `useForm` 。
引数として1つのオブジェクトを取り、そのプロパティで各種オプションを設定するようになっている。

`register` 関数は返り値として `onChange` , `onBlur` , `name` , `ref` という4つのプロパティを持ったオブジェクトを返す。
(表示値の制御は `ref` の値が `Input` に渡されることで行われている)

## Yup でスキーマバリデーション

React Hook Form のバリデーションを Yup で行う場合、 Yup 本体に加えてカスタムリゾルバのパッケージをインストールする必要がある。

```zsh
$ yarn add yup @hookform/resolvers
```

### サンプルコード

`zipcode` は7桁の数字のみ、 `isAgreed` は `true` しか許容しない、など。

```ts
import * as yup from 'yup';
import type { InferType } from 'yup';
import { genderCode } from './constants';

export const regFormSchema = yup.object({
  username: yup.string().required('必須項目です'),
  zipcode: yup.string().max(7).matches(/\d{7}/, '7桁の数字で入力してください'),
  gender: yup.mixed().oneOf(Object.keys(genderCode)),
  isAgreed: yup.boolean().oneOf([true], '同意が必要です').required(),
});

export type RegFormSchema = InferType<typeof regFormSchema>;
```

呼び出し側。

```tsx
const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    // ! formState から errors を抽出
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      username: '',
      isAgreed: false,
    },
    // ! resolver に yupResolver を渡す
    resolver: yupResolver(regFormSchema),
    // resolver: zodResolver(regFormSchema),
  });

  ...

    return (
    <Box p={3} w="md" borderWidth="1px" borderRadius="lg" boxShadow="base">
      <form onSubmit={handleSubmit(onSubmit)} action="/hoge">
        <FormControl isInvalid={errors.username !== undefined} isRequired>
          <FormLabel htmlFor="username" mt={2}>
            ユーザー名
          </FormLabel>
          <Input size="md" {...register('username')} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        ...


