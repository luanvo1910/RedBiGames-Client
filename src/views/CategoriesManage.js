import { ProductContext } from "../contexts/ProductContext"
import { useContext, useEffect } from "react"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip  from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import addIcon from '../assets/plus-circle-fill.svg'
import SingleCategory from '../components/Categories/Category'
import AddCategoryModal from '../components/Categories/AddCategoryModal'
import UpdateCategoryModal from "../components/Categories/UpdateCategoryModal"

const Dashboard = () => {
  
  const {
    productState: {categories, singleCategory},
    getCategories,
    setShowModal,
    showToast: { show, message, type },
	  setShowToast
  } = useContext(ProductContext)

  useEffect(() => {getCategories()}, [])

  let body = null
  if (categories.lenght === 0) {
    body = (
      <>
      <div className='text-center mx-5 my-5'>
        <h3>No category has been found</h3>
      </div>
      </>
    )
  } else {
    body = (
      <>
      {categories.map(category => (
        <Col key={category._id} className='my-2'>
          <SingleCategory category={category} />
        </Col>
      ))}
      <OverlayTrigger placement='left' overlay={<Tooltip>Add new category</Tooltip>}>
        <Button className='btn-floating' onClick={setShowModal.bind(this, true)}>
            <img src={addIcon} alt="add category" witdh='60' height='60'/>
        </Button>
      </OverlayTrigger>
      </>
    )
  }

  return (
    <>
    {body}
    <AddCategoryModal />
    {singleCategory !== null && <UpdateCategoryModal />}
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