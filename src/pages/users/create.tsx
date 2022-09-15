import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { 
  Box, 
  Divider,
  Flex, 
  Heading, 
  HStack, 
  SimpleGrid, 
  VStack, 
  Button,
  Text
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormData = yup.object().shape({
  name: yup.string().required('* Nome obrigatório !'),
  email: yup.string().required('* E-mail obrigatório !').email('E-mail inválido :('),
  password: yup.string().required('* Senha obrigatória !').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export default function CreateUser(){
  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormData)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return(
    <Box>
      <Header />
      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}  
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%" >
              <Flex direction="column">
                <Input 
                  name="name" 
                  type="text"
                  label="Nome completo" 
                  {...register('name')} 
                />
                <Text color='pink.500'>{errors.name?.message}</Text>
              </Flex>
              <Flex direction="column">
                <Input 
                  name="email" 
                  type="email" 
                  label="E-mail" 
                  {...register('email')} 
                />
                <Text color='pink.500'>{errors.email?.message}</Text>
              </Flex>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Flex direction="column">
                <Input 
                  name="password" 
                  type="password" 
                  label="Senha" 
                  {...register('password')} 
                />
                <Text color='pink.500'>{errors.password?.message}</Text>
              </Flex>
              <Flex direction="column">
                <Input 
                  name="password_confirmation" 
                  type="password" 
                  label="Confirmação da senha" 
                  {...register('password_confirmation')} 
                />
                <Text color='pink.500'>{errors.password_confirmation?.message}</Text>
              </Flex>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end" >
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type='submit' colorScheme="pink" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}