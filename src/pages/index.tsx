import { 
  Button, 
  Flex, 
  Stack,
  Text, 
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('* E-mail obrigatório !').email('E-mail inválido :('),
  password: yup.string().required('* Senha obrigatória !'),
});

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>(
    {
      resolver: yupResolver(signInFormSchema)
    }
  );

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  };

  return (
    <Flex 
      w='100vw' 
      h='100vh' 
      align='center' 
      justify='center'
    >
      <Flex 
        as='form'
        w='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
        >
        <Stack spacing='4'>
          <Input name='email' type='email' label='E-mail' {...register('email', { required: true })} />
          <Text color='pink.500'>{errors.email?.message}</Text>
          <Input name='password' type='password' label='Senha' {...register('password', { required: true })} />
          <Text color='pink.500'>{errors.password?.message}</Text>
        </Stack>
        <Button
          type='submit'
          colorScheme={'pink'}
          mt={4}
          size='lg'
          isLoading={isSubmitting}
        >Entrar</Button>
      </Flex>
    </Flex> 
  )
}
