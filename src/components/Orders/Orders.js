import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getMenu, getOrders} from "../../store/actions/actios";
import {Button, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";

const Orders = props => {
    const initInfo = async () => {
        await props.getDishes();
        await props.getOrders();
    };

    useEffect(() => {
        initInfo()
    }, []);

    const completeOrder = async order => {
        const del = window.confirm('Вы действительно хотите удалить этот заказ?');
        if(del){
            await axios.delete('https://burgerapp-9e830.firebaseio.com/orders/' + order + '.json');
            await props.getOrders();
        }
    };

    const orders = Object.keys(props.prices).length > 0 && Object.keys(props.orders).map((elem, id) => (
        !isNaN(props.orders[elem].totalPrice)  ?
            <ListGroupItem style={{border: '3px solid #ccc', margin: '6px 0'}} key={elem + id} >
                <ListGroup>
                    {Object.keys(props.orders[elem]).map(inElem => inElem !== 'totalPrice' && (
                        <ListGroupItem key={inElem} >
                    <span>
                        {inElem}: {props.orders[elem][inElem]}
                    </span>
                            <span style={{float: 'right', marginRight: '80%', fontWeight: 'bold'}}>
                        {props.priceList[inElem] * props.orders[elem][inElem]} KGS
                    </span>
                        </ListGroupItem>
                    ))}
                    <ListGroupItem> Delivery: 150 </ListGroupItem>
                    <ListGroupItem> Total: {props.orders[elem].totalPrice} </ListGroupItem>
                    <Button color="secondary" onClick={() => completeOrder(elem)}>Complete order</Button>
                </ListGroup>
            </ListGroupItem> :
            <ListGroupItem>
                <ListGroup>
                    <ListGroupItem>Заказ ({elem}) имеет неверные данные</ListGroupItem>
                    <Button color="secondary" onClick={() => completeOrder(elem)}>Complete order</Button>
                </ListGroup>
            </ListGroupItem>
    ))

    return (
        <div>
            <ListGroup>
                {orders}
            </ListGroup>
        </div>
    );
};

const mapStateToProps = state => ({
    orders: state.orders.orders,
    prices: state.dishes.menu,
    priceList: state.orders.priceList
});

const mapDispatchToProps = dispatch => ({
    getDishes: () => dispatch(getMenu()),
    getOrders: () => dispatch(getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);