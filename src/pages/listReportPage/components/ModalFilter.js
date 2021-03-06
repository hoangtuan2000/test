import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createFilterStatus, createFilterType, createFilterIncident,
    createFilterDepartment, createFilterSearchKey, deleteAllFilters, 
} from '../../../redux/filterReport/filterReportSlice'

function ModalFilter(
    {
        showModalFilter, setShowModalFilter,
        reportStatus, reportType, incidentObject, departments
    }
) {

    const dispatch = useDispatch()
    const filterStatus = useSelector((state) => state.filterReportRedux.filters.status)
    const filterType = useSelector((state) => state.filterReportRedux.filters.type)
    const filterIncident = useSelector((state) => state.filterReportRedux.filters.incident)
    const filterDepartment = useSelector((state) => state.filterReportRedux.filters.department)
    const filterSearchKey = useSelector((state) => state.filterReportRedux.filters.searchKey)

    const [selectStatus, setSelectStatus] = React.useState(filterStatus)
    const [selectType, setSelectType] = React.useState(filterType)
    const [selectIncident, setSelectIncident] = React.useState(filterIncident)
    const [selectDepartment, setSelectDepartment] = React.useState(filterDepartment)
    const [searchKey, setSearchKey] = React.useState(filterSearchKey)

    const handlerFilters = () => {
        dispatch(createFilterStatus(selectStatus))
        dispatch(createFilterType(selectType))
        dispatch(createFilterIncident(selectIncident))
        dispatch(createFilterDepartment(selectDepartment))
        dispatch(createFilterSearchKey(searchKey))
        setShowModalFilter(false)
    }

    const handlerDeleteFilters = () => {
        setSelectStatus('')
        setSelectType('')
        setSelectIncident('')
        setSelectDepartment('')
        setSearchKey('')
        dispatch(deleteAllFilters())
    }

    return (
        <>
            <Modal show={showModalFilter} onHide={() => setShowModalFilter(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>B??? L???c B??o C??o</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className='mb-3'>
                        <p className='mb-1'>T??m ki???m b???ng t??? kh??a</p>
                        <Form.Control
                            type="text"
                            placeholder='Nh???p t??? kh??a t??m ki???m'
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <p className='mb-1'>Ch???n tr???ng th??i</p>
                        <Form.Select size="sm" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)}>
                            <option value=''></option>
                            {
                                reportStatus.map((status) => {
                                    return (
                                        <option key={status.code} value={status.code}>{status.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>

                    <div className='mb-3'>
                        <p className='mb-1'>Ch???n lo???i</p>
                        <Form.Select size="sm" value={selectType} onChange={(e) => setSelectType(e.target.value)}>
                            <option value=''></option>
                            {
                                reportType.map((type) => {
                                    return (
                                        <option key={type.code} value={type.code}>{type.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>

                    <div className='mb-3'>
                        <p className='mb-1'>Ch???n s??? c???</p>
                        <Form.Select size="sm" value={selectIncident} onChange={(e) => setSelectIncident(e.target.value)}>
                            <option value=''></option>
                            {
                                incidentObject.map((incident) => {
                                    return (
                                        <option key={incident.code} value={incident.code}>{incident.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>

                    <div className='mb-3'>
                        <p className='mb-1'>Ch???n ph??ng ban</p>
                        <Form.Select size="sm" value={selectDepartment} onChange={(e) => setSelectDepartment(e.target.value)}>
                            <option value=''></option>
                            {
                                departments.map((department) => {
                                    return (
                                        <option key={department.id} value={department.id}>{department.departmentName}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" size='sm' onClick={() => setShowModalFilter(false)}>
                        ????ng
                    </Button>
                    <Button variant="danger" size='sm' onClick={() => handlerDeleteFilters()}>
                        X??a H???t
                    </Button>
                    <Button variant="primary" size='sm' onClick={() => handlerFilters()}>
                        L???c
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalFilter