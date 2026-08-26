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





if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)