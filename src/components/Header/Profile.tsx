import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  return(
    <Flex align="center">
      <Box>
        <Text>Dakson Cruz</Text>
        <Text color='gray.300' fontSize='small'>
          daksonc@gmail.com
        </Text>
      </Box>
      <Avatar 
        size='md'  
        name='Dakson Cruz' 
        src='https://avatars.githubusercontent.com/u/81385265?v=4'
      />
    </Flex>
  )
}