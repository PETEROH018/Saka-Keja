export default function({units,onEdit,onDelete,}){

    
    const handleEdit = (item) => {
        setEditingId(item.id);

        setUnit({
        unitType: item.unitType,
        monthlyRent: item.monthlyRent,
        depositAmount:
            item.depositAmount,
        size: item.size,
        shared: item.shared ?? false,
        bathrooms:
            String(item.bathrooms ?? 0),
        bedrooms:
            String(item.bedrooms ?? 0),
        amenities:
            item.amenities ?? [],
        });

        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };

    /* DELETE */

    const handleDelete = (id) => {
        setUnits((prev) =>
        prev.filter(
            (item) => item.id !== id
        )
        );

        if (editingId === id) {
        resetForm();
        }
    };

    return(
    <>
    </>
    )
}