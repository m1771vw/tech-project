import React, { Component } from "react";
import { getAllEmployees, deleteEmployee, submitEmployee, updateEmployee } from "../../Redux/Actions/index";
import { connect } from "react-redux";
import LazyLoad from "react-lazy-load";
import { Modal, Button, Table, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EmployeeCreate from './EmployeeCreate'
import EmployeeEdit from './EmployeeEdit'
import EmployeeRow from './EmployeeRow';

class EmployeesPage extends Component {
  state = {
    employees: [],
    employeeModal: false
  };
  componentDidMount() {
    this.fetchAllEmployees();
  }

  fetchAllEmployees = async () => {
    await this.props.getAllEmployees();
  };

  closeEmployeeModal = () => {
    this.setState({
      employeeModal: false
    })
      ;
  }

  onSubmitEmployeeModal = async (model) => {
    model = { ...model, project_id: this.props.match.params.id }
    await this.props.submitEmployee(model);
    await this.fetchAllEmployees();
    await this.closeEmployeeModal();
    this.setState({
      assignmentModal: false,
    });
  }

  onUpdateEmployeeModal = async (model) => {
    model = { ...model, project_id: this.props.match.params.id }
    await this.props.updateEmployee(model);
    await this.fetchAllEmployees();
    await this.closeEmployeeModal();
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
              <EmployeeCreate
                onSubmit={this.onSubmitEmployeeModal}
              // key={this.props.key}
              />
              {/* <Dropdown placeholder='Select Employee' fluid search selection options={this.state.dropDown} /> */}
            </Modal.Description>
          </Modal.Content>
        </Modal>


        <LazyLoad height={100} offsetVertical={300}>
          <div>
            <Header color="blue">Employee Roster</Header>
            <Table singleLine selectable>
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
                  let employee_id = em.employee_id || "i";
                  let first_name = em.first_name;
                  let last_name = em.last_name;
                  let position = em.position;
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
          </div>
        </LazyLoad>
      </div>
    );
  }
}

const mapStateToProps = ({ employeeReducer }) => ({
  employees: employeeReducer.employees
});

const mapDispatchToProps = dispatch => ({
  getAllEmployees: () => dispatch(getAllEmployees()),
  deleteEmployee: id => dispatch(deleteEmployee(id)),
  submitEmployee: (model) => dispatch(submitEmployee(model)),
  updateEmployee: (model) => dispatch(updateEmployee(model))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesPage);