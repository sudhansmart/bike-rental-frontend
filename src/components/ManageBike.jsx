import React, { useState, useEffect } from 'react';
import { Button,Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import AdminNavBar from './AdminNavBar';


function ManageBike({adminloggedin}) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    rentperhour: '',
    type: '',
    description: '',
    imagelink: '',
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get('https://goglide.onrender.com/bikelist/data');
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
    setFormData(product);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `https://goglide.onrender.com/bikelist/${selectedProduct._id}`,
        formData
      );
  
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id ? formData : product
          )
        );
        setShowEditModal(false);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
    console.log("save clicked");
  };
  

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting product:", selectedProduct);
  
      const response = await axios.delete(
        `https://goglide.onrender.com/${selectedProduct._id}`
      );
  
      console.log("Delete response:", response);
  
      if (response.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== selectedProduct._id)
        );
        setShowDeleteModal(false);
        setSelectedProduct(null); // Set selectedProduct to null after successful deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
    setFormData({
        make: '',
        model: '',
        year: '',
        mileage: '',
        rentperhour: '',
        type: '',
        description: '',
        imagelink: '',
    });
  };

 
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  

  return (
    <> <AdminNavBar adminloggedin={adminloggedin}/>
    <div className="bike-container">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((bike) => (
          <div key={bike._id} className='bike-list'  style={{ margin: '15px 30px', textAlign: 'center' }}>
            <img
              src={bike.imagelink}
              alt={bike.make}
              style={{ width: '300px', height: '250px', objectFit: 'cover',margin:'15px' }}
            />
            <h3>{bike.make} {bike.model}</h3>
            <p>Type : {bike.type} </p>
            <h3>Rent : <FontAwesomeIcon icon={faIndianRupeeSign} style={{fontSize:'15px'}}/> {bike.rentperhour}/Hour</h3>
           
            <p>Year : {bike.year}</p>
            <p className='description-container' >Description : {bike.description}</p>
            <Button variant="primary" onClick={() => handleEdit(bike)}style={{marginRight:"15px"}}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(bike)}>
                Delete
              </Button>
           
           
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bike List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={selectedProduct ? selectedProduct.make : ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleEditInputChange}
                placeholder='YYYY'
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>mileage</Form.Label>
              <Form.Control
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Rent Per Hour</Form.Label>
              <Form.Control
                type="number"
                name="rentperhour"
                value={formData.rentperhour}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          <Form.Group controlId="formGridState">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleEditInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Sports">Sport</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Economuter">Economuter</option>
                      <option value="Commuter">Commuter</option>
                      <option value="Street">Street</option>
                      <option value="Cruiser">Cruiser</option>
                      <option value="Street">Street</option>
                      <option value="Touring">Touring </option>
                      <option value="Dirt">Dirt</option>
                      <option value="Dual-sport">Dual-sport</option>
                    </Form.Select>
                  </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>image link</Form.Label>
              <Form.Control
                type="text"
                name="imagelink"
                value={formData.imagelink}
                onChange={handleEditInputChange}
              />
               <Form.Group controlId="formTitle">
              <Form.Label>Description</Form.Label>
              <Form.Control
                 as="textarea"
                name="description"
                value={formData.description}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the product: {selectedProduct?.productname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default ManageBike;
