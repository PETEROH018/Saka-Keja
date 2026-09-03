import UnitReviewCard from "./UnitReviewCard"
import Icon from "../Icon/Icon";

const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString();
  };

export default function UnitsReview({unit,onBack,onEditunit,onSubmit}){
    return(
        
                <section className="mt-6">
        
                  <div className="mb-3 flex items-center justify-between">
        
                    <button
                      type="button"
                      onClick={onEditunit}
                      className="flex items-center gap-1 text-[14px] font-medium text-[#59388f] hover:text-[#452770]"
                    >
                      <Icon name="edit" size={11} />
                      Edit unit
                    </button>
        
                  </div>
        
                
                    <div className="space-y-3">
        
                      
                        <UnitReviewCard
                          key={unit.id}
                          unit={unit}
                          formatCurrency={formatCurrency}
                        />
                     
        
                    </div>
                
                  <div className="mt-7 flex items-center justify-between">
                  
                            <button
                              type="button"
                              onClick={onBack}
                              className="flex h-8 items-center gap-1.5 rounded-md border border-[#ddd4df] bg-white px-4 text-[13px] text-[#49434d] hover:bg-gray-50"
                            >
                              <Icon name="arrowLeft" size={11} />
                              Back
                            </button>
                            <button
                                    type="button"
                                    onClick={() => onSubmit?.()}
                                    className="flex h-8 items-center gap-1.5 rounded-md bg-[#5b3894] px-5 text-[13px] font-medium text-white hover:bg-[#4e3084]"
                            >
                                    Submit Property
                                    <Icon name="arrowRight" size={11} />
                            </button>
                </div>
        
                </section>
    )
}