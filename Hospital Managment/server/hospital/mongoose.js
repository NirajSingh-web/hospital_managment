const mongoose = require("mongoose");
// connecting mongo cloud
async function MGConnection() {
  try {
    const url =
      "mongodb+srv://Niraj:Changer123@cluster0.tia72jr.mongodb.net/Hospital?retryWrites=true&w=majority";
    mongoose.connection["Hospital"];
    return await mongoose.connect(url, {
      dbName: "Hospital",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e){
    console.log("database connection cut", e.message);
  }
}
// creating mongo schema for appointment and connecting to model
async function Appointment() {
  const Appointment_Schema = new mongoose.Schema(
    {
      userid: { type: mongoose.Schema.ObjectId, required: true },
      // device_name: { type: String, required: true },
      AppointmentId: { type: String, required: true, unique: true },
      Doctorid: { type: String, required: true },
      PatientID: { type: String, required: true },
      department: { type: String, required: true },
      doctorname: { type: String, required: true },
      Appointment_Date: { type: String, required: true },
      time: { type: String, required: true },
      Token: { type: String, required: true },
      problem: { type: String, required: true },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );
  const Appointment_Collection =
    (await MGConnection()).models.appointments ||
    (await MGConnection()).model("appointments", Appointment_Schema);
  return Appointment_Collection;
}

// creating mongo schema for PATIENT SCHEMA and connecting to model
async function Patient() {
  const patient_Schema = new mongoose.Schema(
    {
      userid: { type: mongoose.Schema.ObjectId, required: true },
      PatientID: { type: String, unique: true, required: true },
      Name: { type: String, required: true },
      dob: { type: Date, required: true },
      age: { type: Number, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
      gender: { type: String, required: true },
      address: { type: String, required: true },
      file: {
        type: Object,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );
  const patient_Collection =
    (await MGConnection()).models["patients"] ||
    (await MGConnection()).model("patients", patient_Schema);
  return patient_Collection;
}
// creating mongo schema for Doctor and connecting to model
async function Doctor() {
  const Doctor_Schema = new mongoose.Schema(
    {
      userid: { type: mongoose.Schema.ObjectId, required: true },
      Doctorid: { type: String, unique: true, required: true },
      Name: { type: String, required: true },
      gender: { type: String, required: true },
      experience: { type: Number, required: true },
      specialization: { type: String, required: true },
      dob: { type: Date, required: true },
      age: { type: Number, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      doctordetail: { type: String, required: true },
      Availability: {
        type: String,
        enum: ["on Leave", "Not Available", "Available"],
        default: "Not Available",
      },
      file: { type: Object, required: true },
    },
    {
      timestamps: true,
    }
  );
  const Doctor_Collection =
    (await MGConnection()).models["doctors"] ||
    (await MGConnection()).model("doctors", Doctor_Schema);
  return Doctor_Collection;
}
// creating mongo schema for payment and connecting to model
async function payment() {
  const payment_Schema = new mongoose.Schema(
    {
      userid: { type: mongoose.Schema.ObjectId, required: true },
      PaymentID: { type: String, required: true, unique: true },
      PatientID: { type: String, required: true, unique: true },
      patient_Name: { type: String, required: true },
      Department: { type: String, required: true },
      Doctorid: { type: String, required: true, unique: true },
      Admission_Date: { type: Date, required: true },
      Discharge: { type: Date, required: true },
      submit_date: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      Services: [
        {
          Servicename: { type: String, required: true },
          Cost: { type: String, required: true },
        },
      ],
      payment: {
        discount: { type: Number },
        type: { type: String, required: true },
        advancePaid: { type: Number, default: 0 },
        cardCheckNumber: { type: Number },
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );
  const paymrnt_Collection =
    (await MGConnection()).models["payments"] ||
    (await MGConnection()).model("payments", payment_Schema);
  return paymrnt_Collection;
}
// creating mongo schema for room and connecting to model
async function Room() {
  const Room_Schema = new mongoose.Schema(
    {
      userid: { type: mongoose.Schema.ObjectId, required: true },
      RoomNumber: { type: Number, required: true },
      RoomType: { type: String, required: true },
      Patient_Name: { type: String, required: true },
      Allotment_Date: { type: Date, required: true },
      Discharge_Date: { type: Date, required: true },
      Doctor_Name: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  const Room_Collection =
    (await MGConnection()).models["rooms"] ||
    (await MGConnection()).model("rooms", Room_Schema);
  return Room_Collection;
}

// creating mongo schema for patient user and connecting to model
async function patientRegister() {
  const user_Schema = new mongoose.Schema(
    {
      Username: { type: String, required: true },
      password: { type: String, required: true },
      Email: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  const user_Collection =
    (await MGConnection()).models["patientusers"] ||
    (await MGConnection()).model("patientusers", user_Schema);
  return user_Collection;
}
// creating mongo schema for doctor and connecting to model
async function DoctorRegister() {
  const user_Schema = new mongoose.Schema(
    {
      Username: { type: String, required: true },
      password: { type: String, required: true },
      Email: { type: String, required: true },
      phone: { type: Number, required: true },
      file: { type: Object, required: true },
      status: {
        type: String,
        required: true,
        enum: ["Pending", "Cancelled", "Approved"],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );
  const user_Collection =
    (await MGConnection()).models["doctorusers"] ||
    (await MGConnection()).model("doctorusers", user_Schema);
  return user_Collection;
}
// creating mongo schema for Admin and connecting to model
async function Admin() {
  const Admin_Schema = new mongoose.Schema({
    Username: { type: String, required: true },
    password: { type: String, required: true },
  });
  const Admin_Collection =
    (await MGConnection()).models["admins"] ||
    (await MGConnection()).model("admins", Admin_Schema);
  return Admin_Collection;
}
// creating mongo schema for specialist and connecting to model
async function getDoctorSpecialistdata() {
  const specialistchema = new mongoose.Schema({
    specialist: { type: Object, required: true },
  });
  const Specialistcollection =
    (await MGConnection()).models["doctorspecialist"] ||
    (await MGConnection()).model("doctorspecialist", specialistchema);

  return Specialistcollection;
}
// creating mongo schema for hospitaldepartment list and connecting to model
async function getHospitalDepartment() {
  const Departmentchema = new mongoose.Schema({
    medicalDepartments: { type: Object, required: true },
  });
  const Departmentlistcollection =
    (await MGConnection()).models["departmentlist"] ||
    (await MGConnection()).model("departmentlist", Departmentchema);

  return Departmentlistcollection;
}
module.exports = {
  Appointment,
  Patient,
  Doctor,
  payment,
  Room,
  patientRegister,
  DoctorRegister,
  getDoctorSpecialistdata,
  getHospitalDepartment,
  Admin,
};
