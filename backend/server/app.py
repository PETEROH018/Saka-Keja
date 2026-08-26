from configs import *
from schema import *
from models.Unit import Unit
from models.Apartment import Apartment
from models.ApartmentAmenity import ApartmentAmenity
from models.ApartmentAmenityJoining import ApartmentAmenityJoining
from models.ApartmentOwner import ApartmentOwner
from models.Student import Student
from models.NearbyFacility import NearbyFacility
from models.UnitAmenity import UnitAmenity
from models.UnitAmenityJoining import UnitAmenityJoining
from models.StudentUnit import StudentUnit
from models.Payment import Payment

apartment_schema=ApartmentSchema()

@app.route('/apartment',methods=['POST'])
def add_apartment():
    data = request.get_json()

    if not data:
            return jsonify({"error":"No input data provided"}),400
    
        
    
    



if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)