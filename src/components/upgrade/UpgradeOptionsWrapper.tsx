import { StripeProduct } from '@/src/pages/account'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { SiMarketo } from 'react-icons/si'
import { ActionButton } from './ActionButton'
import { PricingCard } from './PricingCard'

export const UpgradeOptionsWrapper = ({
  products
}: {
  products: StripeProduct[]
}) => {
  const sortedProducts = products.sort(
    (a, b) => a.metadata.price - b.metadata.price
  )

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
        {sortedProducts.map((product, index) => (
          <PricingCard
            key={product.name}
            height='600px'
            border='1px white solid'
            data={{
              price: '$' + product.metadata.price,
              name: product.name,
              features: Object.entries(product.metadata)
                .filter(([key, value]) => key !== 'price')
                .map(([key, value]) => value)
            }}
            icon={SiMarketo}
            button={
              <ActionButton
                variant='outline'
                borderWidth='2px'
                product={product}
                // sessionId={''}
              >
                Upgrade
              </ActionButton>
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default UpgradeOptionsWrapper
