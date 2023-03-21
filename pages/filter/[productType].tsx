import { useRouter } from 'next/router'
import { useAppSelector } from 'lib/hooks/hooks'
import { selectShirts, selectShoes, selectShorts } from 'lib/clothesSlice'

export default function ProductGrouped() {

  const shoes = useAppSelector(selectShoes)
  const shorts = useAppSelector(selectShorts)
  const shirts = useAppSelector(selectShirts)
  const router = useRouter()
  const { product } = router.query

  console.log(product)




  return (
    <div>
      

    </div>
  )
}
