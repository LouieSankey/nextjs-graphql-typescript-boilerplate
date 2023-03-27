import {
  StyleSheet,
  View
  // @ts-ignore
} from 'react-native-alias'
// @ts-ignore
import { createStyled } from '@emotion/primitives-core'
import PricingCard from '../components/pricing/pricingCard'
import { useScreenSize } from '../hooks/useScreenSize'
import { getMedia } from '../ui/responsive-css-helpers'
import { ScreenSize, StripeProduct } from '../util/types'

interface UpgradeOptionsProps {
  products: StripeProduct[]
  purchaseProduct(name: string): Promise<void>
}

const UpgradeOptions = ({ products, purchaseProduct }: UpgradeOptionsProps) => {
  const screenSize = useScreenSize()
  const sortedProducts = products.sort(
    (a, b) => a.metadata.price - b.metadata.price
  )

  return (
    <Grid screenSize={screenSize}>
      {sortedProducts.map((product) => (
        <PricingCard
          key={product.name}
          screenSize={screenSize}
          product={product}
          purchaseProduct={purchaseProduct}
        />
      ))}
    </Grid>
  )
}

const styled = createStyled(StyleSheet)

const Grid = styled(View)`
  height: ${(size: ScreenSize) =>
    getMedia(size, { mobile: '900px', tablet: '900px', desktop: '300px' })};
  display: grid;
  grid-template-columns: ${(size: ScreenSize) =>
    getMedia(size, {
      mobile: 'repeat(1, minmax(0, 1fr))',
      tablet: 'repeat(1, minmax(0, 1fr))',
      desktop: 'repeat(3, minmax(0, 1fr))'
    })};
  gap: ${(size: ScreenSize) =>
    getMedia(size, { mobile: '24px', tablet: '24px', desktop: '8px' })};
`

export default UpgradeOptions
