import { StripePrice } from '@/src/pages/account'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { SiMarketo } from 'react-icons/si'
import { ActionButton } from './ActionButton'
import { PricingCard } from './PricingCard'

export const UpgradeOptionsWrapper = ({
  prices
}: {
  prices: StripePrice[]
}) => {
  return (
    <Box
      as='section'
      bg={useColorModeValue('gray.50', 'gray.800')}
      py='14'
      px={{ base: '4', md: '8' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: '8', lg: '3' }}
        maxW='7xl'
        mx='auto'
        justifyItems='center'
        alignItems='center'
      >
        <PricingCard
          border='1px white solid'
          data={{
            price: '$14',
            name: 'Pro-Max',
            features: [
              'All application UI components',
              'Lifetime access',
              'Use on unlimited projects',
              'Free Updates'
            ]
          }}
          icon={SiMarketo}
          button={
            <ActionButton variant='outline' borderWidth='2px'>
              Upgrade
            </ActionButton>
          }
        />

        <PricingCard
          border='1px white solid'
          data={{
            price: '$14',
            name: 'Pro-Max',
            features: [
              'All application UI components',
              'Lifetime access',
              'Use on unlimited projects',
              'Free Updates'
            ]
          }}
          icon={SiMarketo}
          button={
            <ActionButton variant='outline' borderWidth='2px'>
              Upgrade
            </ActionButton>
          }
        />
        <PricingCard
          border='1px white solid'
          data={{
            price: '$14',
            name: 'Pro-Max',
            features: [
              'All application UI components',
              'Lifetime access',
              'Use on unlimited projects',
              'Free Updates'
            ]
          }}
          icon={SiMarketo}
          button={
            <ActionButton variant='outline' borderWidth='2px'>
              Upgrade
            </ActionButton>
          }
        />
      </SimpleGrid>
    </Box>
  )
}

export default UpgradeOptionsWrapper
