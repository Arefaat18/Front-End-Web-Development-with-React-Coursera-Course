import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Component } from 'react';

    function RenderDish({dish}){
            
                return (
                    <Card>
                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
                    <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                    </Card>
                );
            
        }

    function RenderComments({comments,addComment,dishId}){
        let list = comments.map((comments)=>{

            return(
                <li key={comments.id} >
                    <div>
                        <p>{comments.comment}</p>
                        <p>--{comments.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                    </div>
                </li>

            )
        })

        return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}>

                    </CommentForm>
                </div>
        )
    }

    

    class DishDetail extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false
            }
  
        }

    

        
        render(){
        const dish=this.props.selectedDish;        
        console.log(dish)
        if(this.props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>
            </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments = {this.props.comments}  addComment={this.props.addComment} dishId={this.props.dish.id}/>
                            
                        </div>
                    </div>
                </div>
            )

        }
        else{
            return (
                <div></div>
            );
        }
    }
}
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert(this.props.dishId+ "Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }

    

    render(){
        return (
            <div>
            <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-edit fa-lg"></span>Submit Comment
                                    </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label> </Row>
                                <Row>
                                
                                <Col>
                                    <Control.select model=".rating" className="form-control"name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={4}>Your Name</Label></Row>
                                <Row>
                                <Col>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label></Row>
                                <Row>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        className="form-control"
                                        
                                         />
                                   
                                </Col>
                            </Row>
                            
                            <Button type="submit" value="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                        </LocalForm>
                        </ModalBody>
                        </Modal>
                        </div>
        )
    }
}


export default DishDetail;