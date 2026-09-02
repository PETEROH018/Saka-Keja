import UnitReviewCard from "./UnitReviewCard"

export default function UnitsReview(){
    return(
        
                <section className="mt-6">
        
                  <div className="mb-3 flex items-center justify-between">
        
                    <div>
                      <h2 className="text-[12px] font-semibold text-[#39333d]">
                        Units
                      </h2>
        
                      <p className="mt-1 text-[8px] text-[#8b838e]">
                        {units.length}{" "}
                        {units.length === 1 ? "unit" : "units"} added
                      </p>
                    </div>
        
                    <button
                      type="button"
                      onClick={onEditUnits}
                      className="flex items-center gap-1 text-[9px] font-medium text-[#59388f] hover:text-[#452770]"
                    >
                      <Icon name="edit" size={11} />
                      Edit Units
                    </button>
        
                  </div>
        
                  {units.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#cfc3d7] bg-white px-4 py-8 text-center">
                      <p className="text-[9px] text-[#8b838e]">
                        No units have been added.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
        
                      {units.map((unit, index) => (
                        <UnitReviewCard
                          key={unit.id || index}
                          unit={unit}
                          formatCurrency={formatCurrency}
                        />
                      ))}
        
                    </div>
                  )}
        
                </section>
    )
}