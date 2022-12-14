import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  Icon, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead,
  Tr, 
  Text, 
  useBreakpointValue, 
  Spinner
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import Pagination from "../../components/Padination";
import Sidebar from "../../components/SideBar";
import useUsers from "../../services/hooks/useUsers";


export default function UsersList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error} = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  return (
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
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="8"
        >
          <Flex 
            mb="8" 
            justify="space-between" 
            align="center"
          >
            <Heading 
              size="lg"  
              fontWeight="normal" 
            >
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine}
                fontSize="20"
                />} 
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpa">
                <Thead>
                  <Tr>
                    <Th
                      px={["4", "4", "6"]}
                      color="gray.300"
                      width="8"
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && 
                      <Th>Data de cadastro</Th> 
                    }
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td> }
                        <Td>
                          { isWideVersion &&
                            <Button
                              as="a"
                              size="sm"
                              colorScheme="pink"
                              leftIcon={<Icon as={RiPencilLine} fontSize="21" />}
                            >editar</Button>
                          }
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination 
                totalCoutOfRetries={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}