import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps {
  icon: React.ElementType;
  children: string;
}

export default function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return(
    <Link display='flex' {...rest}>
      <Icon as={icon} fontSize='20' />
      <Text ml='4' fontWeight='medium'>{children}</Text>
    </Link>
  )
}