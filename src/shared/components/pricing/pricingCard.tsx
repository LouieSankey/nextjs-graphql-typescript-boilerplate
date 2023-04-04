// @ts-ignore
import { createStyled } from '@emotion/primitives-core'
import {
  StyleSheet,
  Text,
  View
  // @ts-ignore
} from 'react-native-alias'
import { StripeProduct } from '../../sharedUtils/types'
import { Colors } from '../../ui/constants'
import { CustomButton } from '../../ui/buttons'
// @ts-ignore
import { useSession } from 'use-session-alias'

interface PricingCardProps {
  screenSize: string
  product: StripeProduct
  purchaseProduct(price: string): Promise<void> //marks a fn that uses async await with no return value
}

const PricingCard = ({ product, purchaseProduct }: PricingCardProps) => {
  let session
  try {
    session = useSession()
  } catch (error) {
    console.log('session error ', error)
  }

  console.log(JSON.stringify(session, null, 2))
  const isSubscribed = product.name === session?.data?.user?.tier

  return (
    <Card isSubscribed={isSubscribed}>
      <Title>{product.name}</Title>
      <Price>{'$' + product.metadata.price + '/Month'}</Price>

      {Object.entries(product.metadata)
        .filter(([key, value]) => key !== 'price')
        .map(([key, feature]) => (
          <Feature key={feature}>{feature}</Feature>
        ))}

      <SelectButtonWrapper>
        <CustomButton
          textColor={Colors.white}
          backgroundColor={isSubscribed ? Colors.brandPrimary : Colors.black}
          hoverColor={isSubscribed ? Colors.brandSecondary : Colors.darkGrey}
          onPress={() => purchaseProduct(product.default_price)}
          disabled={isSubscribed} // disable the button if subscribed
        >
          {isSubscribed ? 'Current Plan' : 'Upgrade'}
        </CustomButton>
      </SelectButtonWrapper>
    </Card>
  )
}

const styled = createStyled(StyleSheet)

const Card = styled(View)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-bottom: 16px;
  padding: 16px;
  max-width: 100%;
  border-width: 2px;
  border-color: ${Colors.brandPrimary};
`

const Title = styled(Text)`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`

const Price = styled(Text)`
  color: black;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
`

const Feature = styled(Text)`
  color: black;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`

const SelectButtonWrapper = styled(View)`
  margin-top: auto;
`

export default PricingCard
