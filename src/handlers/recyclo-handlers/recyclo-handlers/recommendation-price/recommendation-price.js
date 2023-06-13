import tfNode from '@tensorflow/tfjs-node';

const priceDict = {
  0: 1500,
  1: 12000,
  2: 2000,
  3: 3000,
};

async function loadModel(path) {
  const tfNodeHandler = tfNode.io.fileSystem(path);
  const model = await tfNode.loadLayersModel(tfNodeHandler);

  return model;
}

async function loadImage(imageBuffer) {
  const tfNodeTensor = tfNode.node.decodeImage(imageBuffer);

  const resizedTensor = tfNode.image
    .resizeBilinear(tfNodeTensor, [150, 150])
    .div(tfNode.scalar(255));

  const expandedTensor = resizedTensor.expandDims(0);

  return expandedTensor;
}

async function predictRecycledItem(imageBuffer) {
  const modelClass = await loadModel(
    './src/machine-learning/object-classification-model/model.json'
  );

  const modelFeature = await loadModel(
    './src/machine-learning/object-features-model/model.json'
  );

  const tfNodeTensor = await loadImage(imageBuffer);

  const predictClass = modelClass.predict(tfNodeTensor);
  const predictFeature = modelFeature.predict(tfNodeTensor);

  const objectClass = predictClass.argMax(1).arraySync()[0];
  const objectFeature = predictFeature.arraySync()[0][0];
  const priceResult = priceDict[objectClass] * objectFeature;

  return priceResult;
}

const recommendationPrice = async (request, h) => {
  try {
    const { image } = request.payload;

    const priceRecommended = await predictRecycledItem(image);

    return h
      .response({
        error: false,
        message: 'success',
        data: {
          priceRecommended: Math.ceil(priceRecommended),
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: true,
        message: error.message,
        data: {},
      })
      .code(500);
  }
};

export default recommendationPrice;
