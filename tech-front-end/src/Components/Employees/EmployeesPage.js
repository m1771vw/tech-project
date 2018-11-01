import React, { Component } from "react";
import { getAllEmployees, deleteEmployee, submitEmployee, updateEmployee } from "../../Redux/Actions/index";
import { connect } from "react-redux";
import { Modal, Button, Table, Header, Segment } from "semantic-ui-react";
import EmployeeCreate from './EmployeeCreate';
import EmployeeRow from './EmployeeRow';

class EmployeesPage extends Component {
  state = {
    employees: [],
    employeeModal: false
  };
  componentDidMount() {
    this.props.getAllEmployees();
  }

  closeEmployeeModal = () => {
    this.setState({
      employeeModal: false
    });
  }

  onSubmitEmployeeModal = (model) => {
    this.props.submitEmployee(model);
    this.closeEmployeeModal();
    this.setState({
      assignmentModal: false,
    });
  }

  onUpdateEmployeeModal = (model) => {
    this.props.updateEmployee(model);
    this.closeEmployeeModal();
    this.setState({
      assignmentModal: false,
    });
  }

  render() {
    let { employees } = this.props;
    return (
      <div>
        <Modal
          onClose={this.closeEmployeeModal}
          open={this.state.employeeModal}
          trigger={<Button primary onClick={() => { this.setState({ employeeModal: true }) }}>Add Employee</Button>} closeIcon>
          <Modal.Header>Add Employee</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Add Employee To Project</Header>
              <EmployeeCreate onSubmit={this.onSubmitEmployeeModal}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        {/* <LazyLoad height={100} offsetVertical={300}> */}
          <div>
            <Header color="blue">Employee Roster</Header>
            <Segment style={{overflow: 'auto', maxHeight: 500, maxWidth:1425 }}>
            <Table padded color='blue' singleLine selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {employees.map(em => {
                  let employee_id = em.employee_id || "Error Loading Employee";
                  let first_name = em.first_name;
                  let last_name = em.last_name;
                  return (
                    <EmployeeRow 
                      key={employee_id+first_name+last_name}
                      employee={em}
                      onSubmit={this.onUpdateEmployeeModal}
                    />
                  );
                })}
              </Table.Body>
            </Table>
              </Segment>
          </div>
        {/* </LazyLoad> */}
      </div>
    );
  }
}

const mapStateToProps = ({ employeeReducer }) => ({
  employees: employeeReducer.employees
});

const mapDispatchToProps = dispatch => ({
  getAllEmployees: () => dispatch(getAllEmployees()),
  submitEmployee: (model) => dispatch(submitEmployee(model)),
  updateEmployee: (model) => dispatch(updateEmployee(model))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);