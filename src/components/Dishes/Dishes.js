import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormGroup, Input, Label, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import ModalForm from "../ModalForm/ModalForm";
import Form from "reactstrap/es/Form";
import {connect} from "react-redux";
import {activationEdit, closeEdit, editPrice, editSrc, editTitle, getMenu} from "../../store/actions/actios";

const Dishes = props => {
    const initialShowModal = {
      show: false
    };

    const initialAddDish = {
        title: '',
        price: '',
        imageLink: '',
    };
    const [show, setShow] = useState(initialShowModal);
    const [addDishInfo, setAddDishInfo] = useState(initialAddDish);

    let dishes = props.dishes;

    const initDishes = async () => {
      await props.getDishes();
    };

    useEffect(() => {
        initDishes();
    }, []);

    const showModal = () => {
      setShow({show: true})
    };
    const closeModal = () => {
        setShow({show: false})
    };

    const saveDish = async elem => {
        await axios.put('https://burgerapp-9e830.firebaseio.com/dishes/' + elem + '.json', dishes[elem]);
        await props.getDishes()
    };

    const addDishChange = e => {
      setAddDishInfo({
          ...addDishInfo,
          [e.target.name]: e.target.value
      })
    };

    const addDish = async e => {
        e.preventDefault();
        await axios.post('https://burgerapp-9e830.firebaseio.com/dishes.json', addDishInfo);
        setAddDishInfo(initialAddDish);
        await props.getDishes();
        closeModal()
    };

    const deleteDish = async name => {
        const del = window.confirm('Вы действительно хотите удалить это блюдо?');
        if(del){
            await axios.delete('https://burgerapp-9e830.firebaseio.com/dishes/' + name + '.json');
            await props.getDishes()
        }
    };

    const dishesList = dishes && Object.keys(dishes).map((elem, id) => (
       <ListGroupItem className='position-relative' key={dishes[elem].title + id}>
           <img style={{maxWidth: '200px'}} className='d-inline-block rounded mr-3' src={dishes[elem].imageLink} alt={dishes[elem].title} />
           {dishes[elem].edit ?
               <span style={{left: '230px', top: '35px'}}>
                   price: <input autoFocus={dishes[elem].edit} onChange={props.editPrice} value={dishes[elem].price} name={elem}/>
               </span> :
               <span style={{left: '230px', top: '35px'}} className='d-inline-block position-absolute'>price: {dishes[elem].price}</span>}
           {dishes[elem].edit ?
               <span style={{left: '230px', top: '0'}}>
                   title: <input autoFocus={dishes[elem].edit} onChange={props.editTitle} value={dishes[elem].title} name={elem}/>
               </span> :
               <h2 style={{left: '230px', top: '0'}} className='d-inline-block position-absolute'>{dishes[elem].title}</h2>}
           {dishes[elem].edit && (
               <span style={{left: '230px', top: '65px'}}>
                   src: <input value={dishes[elem].imageLink} onChange={props.editSrc} name={elem}/>
               </span>
           )}
           {dishes[elem].edit ?
               <Fragment>
                   <Button onClick={() => props.closeEdit(elem)} className='float-right' color="secondary">X</Button>
                   <Button style={{marginRight: '10px'}} onClick={() => saveDish(elem)} className='float-right' color="secondary">Save</Button>
               </Fragment>
               :
               <Fragment>
                   <Button className='float-right' color="secondary" onClick={() => props.activationEdit(elem)} >Edit</Button>
                   <Button style={{marginRight: '10px'}} className='float-right' color="secondary" onClick={() => deleteDish(elem)}>Delete</Button>
               </Fragment>
           }
       </ListGroupItem>
    ));

    return (
        <div>
            <Button color="secondary" onClick={showModal}>Add new dish</Button>
            <ListGroup>
                {dishesList}
            </ListGroup>
            <ModalForm show={show.show} close={closeModal}>
                <Form onSubmit={addDish}>
                    <FormGroup>
                        <Label for="exampleEmail">Title</Label>
                        <Input required onChange={addDishChange} value={addDishInfo.title} type="text" name="title" id="exampleEmail" placeholder="Title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Price</Label>
                        <Input required onChange={addDishChange} value={addDishInfo.price} type='number' name="price" id="exampleEmail" placeholder="Price" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Src</Label>
                        <Input required onChange={addDishChange} value={addDishInfo.imageLink} type="text" name="imageLink" id="exampleEmail" placeholder="imageLink" />
                    </FormGroup>
                    <Button color="secondary">Add</Button>
                </Form>
            </ModalForm>
        </div>
    );
};

const mapStateToProps = state => ({
    dishes: state.dishes.menu
});

const mapDispatchToProps = dispatch => ({
    getDishes: () => dispatch(getMenu()),
    editTitle: e => dispatch(editTitle(e.target.value, e.target.name)),
    editPrice: e => dispatch(editPrice(e.target.value, e.target.name)),
    editSrc: e => dispatch(editSrc(e.target.value, e.target.name)),
    activationEdit: name => dispatch(activationEdit(name)),
    closeEdit: name => dispatch(closeEdit(name))
});

export default connect(mapStateToProps,mapDispatchToProps)(Dishes);