import React, { useEffect } from "react";
import firebase from "../firebase";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const Table1 = (props) => {
	//const [autorec, setAutorec] = useState([])
	const { dataupdated, setDataupdated, autorec, setAutorec } = props;

	const deleterec = (id) => {
		let dodelete = window.confirm("Are you sure you want to delete ID #" + id);
		if (dodelete) {
			firebase
				.firestore()
				.collection("autotrack")
				.doc(id)
				.delete()
				.then(() => {
					setDataupdated(!dataupdated);
				});
		}
	};

	const columns = [
		{
			Header: "Date",
			accessor: "data.date",
		},
		{
			Header: "Service",
			accessor: "data.service",
		},
		{
			Header: () => <div style={{ textAlign: "right" }}>Mileage</div>,
			accessor: "data.mileage",
			className: "right",
		},
		{
			Header: () => <div style={{ textAlign: "right" }}>Cost</div>,
			accessor: "data.cost",
			Cell: (props) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(props.value),
			className: "right",
		},
	];

	columns.push({
		Header: "Action",
		accessor: "id",
		Cell: (props) => (
			<div align="center">
				<span>
					<img
						alt="Edit Record"
						className="actionicons"
						src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
					/>
				</span>
				<span onClick={(e) => deleterec(props.value)}>
					<img
						alt="Delete Record"
						className="actionicons"
						src="https://image.flaticon.com/icons/svg/3096/3096673.svg"
					/>
				</span>
			</div>
		),
	});

	useEffect(() => {
		//setAutorec([])
		var auto = [];
		//console.log("autorec in useEffect 1", autorec)

		firebase
			.firestore()
			.collection("autotrack")
			.orderBy("date")
			.onSnapshot((snapshot) => {
				let changes = snapshot.docChanges();
				//console.log(changes)
				// eslint-disable-next-line
				changes.map((change) => {
					if (change.type === "added") {
						let datarr = [];
						datarr["id"] = change.doc.id;
						datarr["data"] = change.doc.data();
						auto.push(datarr);
					}
				});// eslint-disable-next-line
				setAutorec(auto);
				//console.log("auto", auto)
			});
			// eslint-disable-next-line
	}, [dataupdated]);

	return (
		<div>
			<ReactTable data={autorec} columns={columns} defaultPageSize={10} />
		</div>
	);
};

export default Table1;
