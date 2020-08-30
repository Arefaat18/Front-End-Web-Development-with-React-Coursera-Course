import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);

    }

    renderDish(dish){
            
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

    renderComments(comments){
        return (
        comments.map( (comment) => {
            return (
                <div>
                <li key={comment.id} className="list-unstyled">
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {comment.date}</p>
                </li>
                </div>
            );

        })
        )
    }

    render(){
        const dish=this.props.selectedDish;        
        
        if(dish != null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(dish.comments)}
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

export default DishDetail;