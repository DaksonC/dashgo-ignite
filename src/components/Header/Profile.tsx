import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  return(
    <Flex align="center">
      { showProfileData && (
      <Box mr="4" textAlign="right">
        <Text>Dakson Cruz</Text>
        <Text color='gray.300' fontSize='small'>
          daksonc@gmail.com
        </Text>
      </Box>
      )}
      <Avatar 
        size='md'  
        name='Dakson Cruz' 
        src='https://avatars.githubusercontent.com/u/81385265?v=4'
      />
    </Flex>
  )
}