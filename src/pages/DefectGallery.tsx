import { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Tag } from 'lucide-react';
import { getDefectGallery, DefectImage } from '../services/api';

export default function DefectGallery() {
  const [images, setImages] = useState<DefectImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<DefectImage | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    getDefectGallery().then(setImages);
  }, []);

  const defectTypes = ['All', 'Hole', 'Stain', 'Thread Break', 'Color Variation'];

  const filteredImages = filter === 'All' ? images : images.filter((img) => img.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Defect Gallery</h2>
        <p className="text-gray-600">Browse and analyze detected fabric defects</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          {defectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <img src={image.imageUrl} alt={image.type} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {image.type}
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-900 mb-1">{image.id}</p>
              <p className="text-xs text-gray-600">Position: {image.position.toFixed(1)}m</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(image.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Defect Details</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.type}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Defect ID</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedImage.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Defect Type</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedImage.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Roll ID</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedImage.rollId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Position</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedImage.position.toFixed(2)} meters</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 col-span-2">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Detection Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(selectedImage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
