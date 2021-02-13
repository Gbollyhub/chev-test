import axios from "axios";
// import {invoice} from '@/InterfaceType/IVehicle';
export default class VehicleService {
  constructor() {
    this.API_URL = process.env.VUE_APP_API_URL;
    this.token = localStorage.getItem("Token");
  }
  async getAllVehicle() {
    let result = await axios.get(`${this.API_URL}/inventory/`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    localStorage.removeItem("Token");
    return result.data;
  }
  async email(id) {
    const formData = new FormData();
    var request = new XMLHttpRequest();
    request.open(`POST`, `${this.API_URL}/inventory/${id}`);
    request.send(formData);
  }
  async postemail(id, file) {
    const formData = new FormData();
    formData.append("pdf", file, "Invoice");
    var request = new XMLHttpRequest();
    request.open(`POST`, `${this.API_URL}/inventory/${id}`, file);
    request.send(formData);
  }
}
//# sourceMappingURL=vehicle-service.js.map
