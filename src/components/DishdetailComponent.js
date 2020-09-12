import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';



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

    function RenderComments({comments}){
        return (
        comments.map( (comment) => {
            return (
                <div>
                <li key={comment.id} className="list-unstyled">
                    <p>{comment.comment}</p>
                    <p>--{comment.author},{new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
                </div>
            );

        })
        )
    }

    const DishDetail = (props) => {
        
        const dish=props.selectedDish;        
        console.log(dish)
        if(props.dish != null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments = {props.dish.comments} />
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


export default DishDetail;