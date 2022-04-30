import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Button, Modal, ModalHeader,
  ModalBody, ModalFooter, Input,
  Label, FormGroup, Form, FormText, Row
} from 'reactstrap'

class ModalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phonenumber: '',
      gender: false,
      roleId: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState(this.props.userEdit)
    }
  }

  handleOnChangeInput = (event, keyState) => {
    this.setState({
      [keyState]: event.target.value
    })
  }

  handleOnClickSubmit = async () => {
    let copyState = this.state
    delete copyState.password
    if (this.props.modeModal === 'add') {
      this.props.createNewUser(this.state)
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phonenumber: '',
        gender: false,
        roleId: ''
      })
    }
    else { //mode edit
      this.props.saveEditUser(copyState)
    }
    this.props.toggle()
  }

  render() {
    return (

      <Modal isOpen={this.props.isOpen} toggle={() => { this.props.toggle() }} className={'abc'} size='lg' centered>
        <ModalHeader toggle={() => { this.props.toggle() }}>
          {this.props.modeModal === 'add' ? <>Create new user</> : <>Edit user</>}
        </ModalHeader>

        <ModalBody>
          <Form>
            {this.props.modeModal === 'add' ?
              <Row xs='2'>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    value={this.state.email}
                    placeholder="...@gmail.com"
                    type="email"
                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">
                    Password
                  </Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    value={this.state.password}
                    type="password"
                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                  />
                </FormGroup>
              </Row>
              :
              <></>
            }

            <Row xs='2'>
              <FormGroup>
                <Label for="firstName">First name</Label>
                <Input
                  onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                  value={this.state.firstName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input
                  onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                  value={this.state.lastName}
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                value={this.state.address}
              />
            </FormGroup>

            <Row xs='3'>
              <FormGroup>
                <Label for="phonenumber">Phone number</Label>
                <Input
                  onChange={(event) => { this.handleOnChangeInput(event, 'phonenumber') }}
                  value={this.state.phonenumber}
                />
              </FormGroup>
              <FormGroup>
                <Label for="gender">
                  Sex
                </Label>
                <Input
                  name="gender"
                  type="select"
                >
                  <option>
                    Male
                  </option>
                  <option>
                    Female
                  </option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="role">
                  Role
                </Label>
                <Input
                  name="gender"
                  type="select"
                >
                  <option>
                    Admin
                  </option>
                  <option>
                    Doctor
                  </option>
                  <option>
                    Patient
                  </option>
                </Input>
              </FormGroup>
            </Row>

          </Form>
        </ModalBody>

        <ModalFooter>
          <Button className='px-3' color="primary" onClick={() => { this.handleOnClickSubmit() }}>
            {this.props.modeModal === 'add' ? <>Create</> : <>Save</>}
          </Button>
          {' '}
          <Button className='px-3' onClick={() => { this.props.toggle() }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


