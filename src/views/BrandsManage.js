import { ProductContext } from "../contexts/ProductContext"
import { useContext, useEffect } from "react"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip  from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import addIcon from '../assets/plus-circle-fill.svg'
import SingleBrand from '../components/Brands/Brand'
import AddBrandModal from '../components/Brands/AddBrandModal'
import UpdateBrandModal from "../components/Brands/UpdateBrandModal"

const Dashboard = () => {
  
  const {
    productState: {brands, brand},
    getBrands,
    setShowModal,
    showToast: { show, message, type },
	setShowToast
  } = useContext(ProductContext)

  useEffect(() => {getBrands()}, [])

  let body = null
  if (brands.lenght === 0) {
    body = (
      <>
      <div className='text-center mx-5 my-5'>
        <h3>No brand has been found</h3>
      </div>
      </>
    )
  } else {
    body = (
      <>
      {brands.map(brand => (
        <Col key={brand._id} className='my-2'>
          <SingleBrand brand={brand} />
        </Col>
      ))}
      <OverlayTrigger placement='left' overlay={<Tooltip>Add new brand</Tooltip>}>
        <Button className='btn-floating' onClick={setShowModal.bind(this, true)}>
            <img src={addIcon} alt="add brand" witdh='60' height='60'/>
        </Button>
      </OverlayTrigger>
      </>
    )
  }

  return (
    <>
    {body}
    <AddBrandModal />
    {brand !== null && <UpdateBrandModal />}
    <Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
    </>
  )
}

export default Dashboard