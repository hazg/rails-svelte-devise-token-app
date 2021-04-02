# Sorting, filtering and pagination concern
module WithParams
  extend ActiveSupport::Concern
  include Pagy::Backend
  require 'pagy/extras/items'

  def pagy_with_params(collection, _params = params)
    model      = controller_name.classify.constantize
    @sort_by   = _params['sort_by']
    @filter_by = _params['filter_by']

    # Sorting
    @sort_by.each do |k, v|
      if model.attribute_names.include?(k)
        collection = collection.order([[k, v]].to_h)
      end
    end if @sort_by

    # Filtering
    @filter_by.each do |k, v|
      if model.attribute_names.include?(k)
        collection = collection.where([[k, v]].to_h)
      end
    end if @filter_by

    pagy( collection )
  end

end
